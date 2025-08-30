
import express from "express";
import cors from 'cors';
import authRoutes from './api/auth/auth.route';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/api/health-check', (req, res) => {
    res.json({
        message: "API is working fine"
    })
});
app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
    console.log(`Server on running on http:localhost:${PORT}`);
})



export default app;