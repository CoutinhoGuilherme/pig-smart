export default{
    dialect:'postgresql',
    scheme:'./utils/schema.js',
    out:'.drizzle',
    dbCredentials:{
        url: process.env.NEXT_PUBLIC_DATABASE_URL,
        conncetionStrings: process.env.NEXT_PUBLIC_DATABASE_URL,
    }
}