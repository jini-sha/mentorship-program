const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');
const connectDB = require('./utils/db');
const mainRouter = require('./routers/index.routes')
const errorMiddleware = require('./middlewares/error.middleware');
app.use(cors());
app.use(errorMiddleware);
app.use('/api', mainRouter);
connectDB()
    .then(() => {
        app.listen(process.env.PORT);
        console.log(`Server is running on port ${process.env.PORT}`);
    })
    .catch((error) => {
        console.log("Error in starting server", error);
    });