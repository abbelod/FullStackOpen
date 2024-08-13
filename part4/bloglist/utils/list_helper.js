const dummy = (blogs) =>{
    return 1
}


const totalLikes = (blogs)=>{

    const reducer = (sum,item)=>{
        return sum+item.likes
    }

    return blogs.reduce(reducer,0)

}

const favouriteBlog = (blogs)=>{

    ascend = blogs.sort((a,b)=>{
        if(a.likes>b.likes){
          return -1
        }
        return 1
      })

    return ascend[0]

}





const mostBlogs = (blogs)=>{

    const counts = {}

    blogs.forEach((blog)=>{
        counts[blog.author] = counts[blog.author]? (counts[blog.author]+1) : 1
    })
    let keys = Object.keys(counts)
    let values = Object.values(counts)

    let maxVal = 0
    let maxIndex = 0
    values.map((value, index)=>{
        maxVal = Math.max(value, maxVal)
        maxIndex = index
    })

    let returnVal = {
        author: keys[maxIndex],
        blogs: maxVal
    }

    console.log(returnVal)

    return returnVal

    

}


const mostLikes = (blogs)=>{

    const counts = {}

    blogs.map((blog)=>{
        counts[blog.author] = counts[blog.author] ? (counts[blog.author]+blog.likes) : blog.likes
    })

    const keys = Object.keys(counts)
    const values = Object.values(counts)
    let maxVal = values[0]
    let maxIndex = 0

    values.map((val, index)=>{
        if(val > maxVal){
            maxVal = val
            maxIndex = index
        }
    })

    const result = {
        author: keys[maxIndex],
        likes: values[maxIndex]
    }
    return result
    
}




module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}