import blogActions from "./Blog";
import blogsActions from "./Blogs";

export const saveNewBlog = (data) => {
  return async (dispatch) => {
    async function saveNewBlog() {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      const Authorization = `Bearer ${token}`;

      const url = data.id
        ? `http://localhost:3000/vlogs/${data.id}`
        : "http://localhost:3000/vlogs";

      console.log(data.method);
      console.log(url);

      const response = await fetch(url, {
        method: data.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
        },

        body: JSON.stringify({
          heading: data.heading,
          content: data.content,
          imageURL: data.imageURL,
          category: data.category,
          username: username,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        return responseData.vlog;
      } else {
        const errorData = await response.json();
        return errorData;
      }
    }

    try {
      const data = await saveNewBlog();
      dispatch(blogActions.setBlog(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllBlog = () => {
  return async (dispatch) => {
    async function getData() {
      const response = await fetch("http://localhost:3000/vlogs");
      if (response.ok) {
        const responseData = await response.json();
        return responseData;
      } else {
        const errorData = await response.json();
        return errorData;
      }
    }

    try {
      const data = await getData();
      console.log(data);
      dispatch(blogsActions.addBlog(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteBlogAction = (id) => {
  return async (dispatch) => {
    async function deleteBlog() {
      const url = `http://localhost:3000/vlogs/${id}`;

      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        const responseData = await response.json();
        return responseData.vlogs;
      } else {
        const errorData = await response.json();
        return errorData;
      }
    }

    try {
      const data = await deleteBlog();
      console.log(data);
      dispatch(blogActions.setBlog(data));
    } catch (error) {
      console.log(error);
    }
  };
};
