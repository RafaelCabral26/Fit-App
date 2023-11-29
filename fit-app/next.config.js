/** @type {import('next').NextConfig} */
module.exports = {

    async redirects() {
        return[
            {
                source:'/home',
                destination:'/',
                permanent:true,
            },
        ]
        },
}
