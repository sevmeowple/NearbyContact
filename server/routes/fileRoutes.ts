import {Router} from "express";

const router = Router();

router.get('/thumbnail/:filename', async (req, res) => {
    const {filename} = req.params;
    res.sendFile(`${process.cwd()}/uploads/thumbnails/${filename}`);
});

router.get('/image/:filename', async (req, res) => {
    const {filename} = req.params;
    res.sendFile(`${process.cwd()}/uploads/images/${filename}`);
});

export const fileRoutes = router;