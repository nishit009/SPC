import { Router } from "express";
import post_controller from "../controllers/post.controller.js";

const route=Router()

route.post("/postman",post_controller)

export default route