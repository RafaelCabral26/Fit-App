/** @type {import('next').NextConfig} */
module.exports = {
    distDir: 'dist',
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
