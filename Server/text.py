from twilio.rest import Client




def send(phoneNumber):


    # Your Twilio account SID and Auth Token
    account_sid = 'AC4516245caef9cb20ffffe78a3f264402'
    auth_token = '186a810b0f2839fcef70a656b7a81624'

    # Initialize the Twilio client
    client = Client(account_sid, auth_token)

    # Your Twilio phone number and the target phone number
    from_number = '+17208159342'
    to_number = '+1' + 5126623667

    # Message you want to send
    message_body = 'Aghghghghghhgh. Test.!'

    # Send the text message
    message = client.messages.create(
        to=to_number,
        from_=from_number,
        body=message_body
    )

    print(f'Message sent successfully, ID: {message.sid}')
