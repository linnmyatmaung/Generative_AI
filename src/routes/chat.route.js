import { Router } from 'express';
import { chatController } from '../controllers/chat.controller.js';

const router = Router();

router.post('/chat', chatController)

router.post('/test', (req, res) => {
    res.send({
        reply: "Hello! You've successfully reached the test route. This confirms that your POST request is working properly and the server is responding as expected."
    });
});


export default router;