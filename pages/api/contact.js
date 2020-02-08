const fetch = require('node-fetch');
const md5 = require('md5');
const nodemailer = require('nodemailer');
const config = require('dotenv').config();

const {
    MAILCHIMP_API_KEY,
    MAILCHIMP_LIST_ID,
    CLIENT_ID,
    CLIENT_SECRET,
    REFRESH_TOKEN,
    ACCESS_TOKEN,
    CONTACT_EMAIL
} = process.env

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: CONTACT_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN,
    }
})

const requestMailChimp = ({method, endpoint, body}) => {

    const getFetchMethod = () => {
        switch(method) {
            case 'post':
                return 'POST'
            case 'put' :
                return 'PUT'
            case 'get' :
            default:
                return 'GET'
        }
    }

    const fetchMethod = getFetchMethod();
    const auth = "Basic " + new Buffer.from('any' + ":" + MAILCHIMP_API_KEY).toString("base64");
   
    const params = Object.assign(
        {
            method : fetchMethod,
            headers: {
                "Authorization" : auth,
                "Content-Type": "application/json"
            },
        } ,
        body && {
            body : JSON.stringify(body)
        } ,
    )

    return new Promise(resolve => {
        fetch(
            `https://us4.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/${endpoint || ""}` ,
            params
        ).then(
            res => {
                console.log({endpoint, status : res.status})
                if (res.status !== 200) {
                    resolve(null);
                }
                else resolve(res.json());
            }
        )
    })
}

const addToCampaign = async ({email, name}) => {
    const body = {
        email_address : email,
        status : "subscribed",
        "merge_fields" : {
            "NAME" : name
        }
    };
    await requestMailChimp({
        endpoint : 'members/',
        body,
        method : 'post'
    })
}

const sendEmail = ({name, email, message}) => {
    transporter.sendMail({
        from: `"Alexia" <${CONTACT_EMAIL}>`,
        to: CONTACT_EMAIL, 
        subject: "Contact Form", 
        text: `
            name : ${name}
            email : ${email},
            message : ${message}
        `, 
        html: `
            <b> name </b> : ${name} <br/>
            <b> email </b> : ${email} <br/>
            <b> message </b> : ${message} <br/>
        `
    });
    console.log(`mail sent to ${name} from ${email}`)
}

export default async (req, res) => {
    if (req.method === 'POST') {

        const form = JSON.parse(req.body);
        if (!form) return ;

        const isContact = await requestMailChimp({endpoint: `members/${md5(form.email)}`});
        if (!isContact) addToCampaign(form)
       
        sendEmail(form);
    }
    return ;
}


