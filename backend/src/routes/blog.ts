import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@jatoth_lokesh/medium1-common";

export const blogRouter = new Hono<{
    Bindings:{
      DATABASE_URL: string,
      JWT_SECRET: string
    },
    Variables:{
        userId: string
    }
  }>();


//middlewares
blogRouter.use('/*', async(c, next)=>{
    const header = c.req.header("authorization");

    if(!header){
        return c.json({
        error: "Unauthorized",
        }, 401)
    }
    const token = header.replace("Bearer ", "");
    const user = await verify(token, c.env.JWT_SECRET);
    

    if(user){
        c.set("userId", user.id as string);
        return next()
    } else{
        return c.json({
        error: "Unauthorized",
        }, 401)
    }
})






blogRouter.post('/', async(c)=>{
    const body = await c.req.json();
    const {success, error} = createBlogInput.safeParse(body);
    if(!success){
        return c.json({
            message: error.errors.map(err => err.message).join(", "),
        }, 411);
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    
    console.log(body);

    const post = await prisma.post.create({
        data: {
            title : body.title,
            content: body.content,
            authorId: c.get("userId")
        }
    })

    return c.json({id: post.id}, 200);
})

blogRouter.put('/', async(c)=>{
    const body = await c.req.json();
    const {success, error} = updateBlogInput.safeParse(body);
    if(!success){
        return c.json({
            message: error.errors.map(err => err.message).join(", "),
        }, 411);
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());


    const post = await prisma.post.update({
        where:{
            id: body.id
        },
        data: {
            title : body.title,
            content: body.content
        }
    })

    return c.json({id: post.id, post}, 200);
})

//TODO : Pagination
blogRouter.get('/bulk', async(c)=>{
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const posts = await prisma.post.findMany();

    return c.json({
        posts
    }, 200);
})

blogRouter.get('/:id', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = await c.req.param("id");

    try {
        const post = await prisma.post.findUnique({
            where:{
                id: id
            }
        })
    
        return c.json({post}, 200);
    } catch (error) {
        console.log(error);
        return c.json({
            message: "Error while fetching post"
        }, 411);
    }

    
})



