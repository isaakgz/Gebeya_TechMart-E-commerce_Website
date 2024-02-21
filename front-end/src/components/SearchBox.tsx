import { useState } from "react"
import { Button, FormControl } from "react-bootstrap";
import { Form, useNavigate, useParams } from "react-router-dom"

function SearchBox() {
    const navigate = useNavigate()
    const {keyword:urlKeyword} = useParams()
    const [keyword, setKeyword] = useState(urlKeyword || "");
    
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(keyword.trim()){
          setKeyword("")
            navigate(`/search/${keyword}`)
        }else{
            navigate('/')
        }
    }



  return (
  <Form onSubmit={submitHandler} className="d-flex" >
    <FormControl
      type="text"
      name="q"
      onChange={(e) => setKeyword(e.target.value)}
      placeholder="Search Products..."
      className="mr-sm-2 ml-sm-5"
        value={keyword}
    ></FormControl>
    <Button type="submit" variant="outline-light" className="p-2 mx-2">
      Search
    </Button>

  </Form>
  )
}

export default SearchBox