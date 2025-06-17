# Uniblog API


## Home
#### Endpoint: /
#### Method: Get
#### Authentication: None
#### Expected Body : None
<br>

## SignUp
#### Endpoint: /auth/signup
#### Method: Post
#### Authentication: None
#### Expected Body : {
    firstName,
    lastName,
    email,
    password
}
<br>

## Login
#### Endpoint: /auth/login
#### Method: Get
#### Authentication: Email & Password
#### Expected Body : None
<br>

## Home
#### Endpoint: /blogs
#### Method: Get
#### Authentication: None
#### Expected Body : None
#### Queries: author,title, tags
<br>

## Get One Blog
#### Endpoint: /blogs/:id
#### Method: Get
#### Authentication: None
#### Expected Body: None
<br>

## Personal Blogs
#### Endpoint: /blogs/myblogs
#### Method: Get
#### Authentication: JWT Token
#### Expected Body: None
#### Query: state
<br>


## Update Blog
#### Endpoint: /blogs/:id
#### Method: Patch
#### Authentication: JWT Token
#### Expected Body: (Whichever is applicable) {
    title,
    description,
    tags,
    body
}
<br>

## Delete Blog
#### Endpoint: /blogs/:id
#### Method: Delete
#### Authentication: JWT Token
#### Expected Body: None
<br>

## Create Blog
#### Endpoint: /blogs
#### Method: Post
#### Authentication: JWT Token
#### Expected Body: {
    title, description, tags, body
}
<br>

## Publish Your Blog
#### Endpoint: /blogs/:id/publish
#### Method: Get
#### Authentication: JWT Token
#### Expected Body: None
<br>




