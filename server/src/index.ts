
import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/api/health-check', (req, res) => {
    res.json({
        message: "API is working fine"
    })
});

app.listen(PORT, () => {
    console.log(`Server on running on http:localhost:${PORT}`);
})