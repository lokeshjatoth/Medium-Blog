import Appbar from "../components/Appbar"
import BlogCard from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";


const Blogs = () => {
    const {loading, blogs} = useBlogs();
    console.log(blogs)


    if (loading) {
        return <div>
            <Appbar /> 
            <div  className="flex justify-center">
                <div className="flex flex-col">
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

  return (
    <div >
        <Appbar/>
        <div className="flex justify-center">
        <div className="max-w-xl">
            {blogs.map( blog => <BlogCard
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                id={blog.id}
                publishedDate={"4th Feb 2025"}
            />)}
        </div>
        </div>
    </div>
  )
}

export default Blogs