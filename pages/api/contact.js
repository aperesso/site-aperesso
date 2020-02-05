const fetch = require('node-fetch');
const md5 = require('md5');
const nodemailer = require('nodemailer');  

const MAILCHIMP_API_KEY = '57a38f7a7cb45a1504cb5f30d5e25de9-us4';
const MAILCHIMP_LIST_ID = '056c262496';

const ACCESS_TOKEN = "ya29.Il-8B-V3F5uiCYNRDyDBQS8p2uBk3Jc0vG3leTO4ShPCQj63z4ifnuVAXLXiLXThpyDf_MLgN87FKkMv4T4GsSyJs08c6h_SIAD3QFlrXooAOvhl-CFFSbTF4k5u8IWmkA";
const REFRESH_TOKEN = "1//04OFFapdZEp3QCgYIARAAGAQSNwF-L9IrGgJw9xYlLSe5GZvIiGoCMID18OUb4MCyxjoZVAOqtydV8K9qGiRQYeQkaKpUcy7H0_Y"
const CLIENT_ID = "969048460490-gq5fvebe04fm3gfn7t0821fqkcgbro8e.apps.googleusercontent.com"
const CLIENT_SECRET = "SkcDFDzxEAyBg1kmgbI7EFxl"
const USER_EMAIL = "alexiaperesson.dev@gmail.com"

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: USER_EMAIL,
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
    const auth = "Basic " + new Buffer('any' + ":" + MAILCHIMP_API_KEY).toString("base64");
   
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
                console.log(res)
                if (res.status !== 200) {
                    resolve(null);
                }
                else resolve(res.json());
            }
        )
    })
}


export default async (req, res) => {
    if (req.method === 'POST') {

        const parsed = JSON.parse(req.body);
        if (!parsed) return ;
        const { name, email , message} = parsed;

        const isContact = await requestMailChimp({endpoint: `members/${md5(email)}`});

        if (!isContact) {
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
       
        await transporter.sendMail({
            from: `"Alexia" <${USER_EMAIL}>`,
            to: USER_EMAIL, 
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
    }
    return ;
}


