import stripe
from flask import Flask, jsonify, request
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, db
import logging

# Setup basic logging
logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
CORS(app)

# Initialize Stripe and Firebase
stripe.api_key = 'sk_test_51P4q7Q03wq2Gsl4MTB58bOnclwVEEHDl8e54tUo6OnEoUhGwcvm13fEXSbAZd2wvVPZLHdu9X9W0qmS8KtD6cQmb00bfiDuw7J'
cred = credentials.Certificate('fb_key.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://atherton-marketing-default-rtdb.firebaseio.com/'
})

@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    data = request.get_json()
    user_email = data.get('email', '')
    user_id = data.get('user_id', '')
    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            mode='subscription',
            line_items=[{
                'price': 'price_1P58jv03wq2Gsl4MgfnqWpQq',
                'quantity': 1,
            }],
            customer_email=user_email,
            success_url='http://localhost:3000/success',
            cancel_url='http://localhost:3000/cancel',
            client_reference_id=user_id,
        )

        ref = db.reference('/users/' + user_id)
        ref.child(user_email.replace('.', ',')).set({
            'stripe_session_id': checkout_session['id'],
            'status': 'initiated'
        })
        return jsonify({'sessionId': checkout_session['id'], 'url': checkout_session.url})
    except Exception as e:
        logging.error(f'Error creating checkout session: {str(e)}')
        return jsonify(error=str(e)), 403

@app.route('/webhook', methods=['POST'])
def stripe_webhook():


    print("webhook is FUCKING BEING CALLED")
    payload = request.get_data(as_text=True)
    sig_header = request.headers.get('Stripe-Signature')
    webhook_secret = 'whsec_ZH2laZoBbdbKhP2MJQrqlgtRnfLzYAOV'

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, webhook_secret
        )
    except ValueError as e:
        logging.error('Invalid payload: ' + str(e))
        return 'Invalid payload', 400
    except stripe.error.SignatureVerificationError as e:
        logging.error('Invalid signature: ' + str(e))
        return 'Invalid signature', 400

    # Handle the event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        customer_email = session['customer_email']
        user_id = session['client_reference_id']
        try:
            ref = db.reference('/users/' + user_id)
            ref.child(customer_email.replace('.', ',')).update({
                'status': 'paid'
            })
        except Exception as e:
            logging.error(f'Failed to update Firebase: {str(e)}')
            return jsonify(error=str(e)), 500

    return jsonify(success=True), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4242)
