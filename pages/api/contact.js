export default (req, res) => {
    if (req.method === 'POST') {
        const e = JSON.parse(req.body);
        console.log(e);
    }
    return ;
}