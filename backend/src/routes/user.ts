import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from "@jatoth_lokesh/medium1-common";

export const userRouter = new Hono<{
    Bindings:{
      DATABASE_URL: string,
      JWT_SECRET: string
    }
  }>();

userRouter.post('/signup', async(c)=>{
    const body = await c.req.json();
    const { success, error } = signupInput.safeParse(body);

    if(!success){
        return c.json({
            message: error.errors.map(err => err.message).join(", "),
        }, 411);
    }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  
  
  try {
    const user = await prisma.user.create({
      data:{
        email: body.email,
        password: body.password,
        name : body.name
      }
    })
  
    if(!user){
      c.status(403);
      return c.json({
        error: "User not found",
      })
    }
  
    const token = "Bearer "+await sign({id: user.id}, c.env.JWT_SECRET);
  
    return c.json({
      jwt: token
    })

  } catch (error) {
    console.log(error);
    return c.json({
      error: "Invalid"
    }, 411);
  }
  
})

userRouter.post('/signin', async(c)=>{
    const body = await c.req.json();
    const { success, error } = signinInput.safeParse(body);
    if(!success){
        return c.json({
            message: error.errors.map(err => err.message).join(", "),
        }, 411);
    }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findUnique({
      where: {
        email : body.email, 
        password: body.password,
      }
    })
    if(!user){
      c.status(403);
      return c.json({
        error: "Invalid Credentials",
      })
    }
  
    const jwt  = "Bearer "+await sign({id: user.id}, c.env.JWT_SECRET);
  
    return c.json({
      jwt
    })
  } catch (error) {
    console.log(error);
    return c.json({
      error: "Invalid"
    }, 411);
  }
  
})