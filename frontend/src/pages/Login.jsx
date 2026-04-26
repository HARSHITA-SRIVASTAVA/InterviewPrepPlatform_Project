import API from "../api/axios";
import { useState } from "react"; //react hook ->store and update data in comp


//create component
const Login = () => {   //formData->curr val , setFormData->update data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

const { email, password } = formData;


//Handle input changes -> run whenever user type in input feilds
const handleChange =  (e) => {
  setFormData({
    ...formData,       //keep old value
    [e.target.name]: e.target.value,   //get input name : user type 
  }); 
};

  //handle submit
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    console.log("Please fill all fields");
    return;
  }

  try{
    //send req to backend
    const res=await API.post("/auth/login", {
      email:email,
      password:password,
    });

    //Debugging logs
    console.log("Full Response: ",res);
    console.log("Response Data:",res.data);
    console.log("Token:",res.data.token);
    localStorage.setItem("token", res.data.token);   //store JWT token
    console.log("Stored Token:", localStorage.getItem("token"));
  }
  catch(error){
    console.log("Error Object:",error);

    //if backend reponse with error
    if (error.response) {
      console.log("Error Response:", error.response);
      console.log("Error Data:", error.response.data);
      console.log("Error Status:", error.response.status);
    } 

    //if no response from backend
    else if (error.request) 
      console.log("No response received:", error.request);

    else 
      console.log("Error Message:", error.message);
  }
  console.log("Form Data:", formData);
};

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
    <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        
      <h2 className="text-2xl font-bold text-center mb-6">
        Login
      </h2>

      <form onSubmit={handleSubmit}>
          
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

      </form>
    </div>
  </div>
  );
};

export default Login;