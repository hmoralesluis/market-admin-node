module.exports = {
    database: process.env.DATABASE || 'mongodb://localhost/blog-admin_online_marketplass',        
    port: process.env.PORT || 3000,
    uploadaccess: 'http://localhost:3000/'
    // uploadaccess: 'https://admin.marketplass.com/'
  }