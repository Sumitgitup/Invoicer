
import { Router } from 'express';

const router = Router();


router.get(('/'), (req, res) => {
    res.status(200).json({ message: 'Inside the get route'})
})

router.post('/register', (req, res) => {
    res.status(501).json({ message: 'Not Implemented'})
});


export default router;