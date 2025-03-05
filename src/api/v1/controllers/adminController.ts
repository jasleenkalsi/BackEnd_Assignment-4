import { Request, Response } from 'express';

const getStatus = (req: Request, res: Response) => {
    res.json({ message: 'Admin API is working!' });
};

export default { getStatus };
