import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosClient = axios.create({
  baseURL: `${baseURL}/api/`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}` 
  },
});

const CreateNewResume = (data) => axiosClient.post('/user-resumes', data);

const GetUserResumes = (userEmail) => {
  return axiosClient.get(`/user-resumes?filters[userEmail][$eq]=${userEmail}`); 
};

const UpdateResumeDetail = (id, data) => axiosClient.put(`/user-resumes/${id}`, data); 

const DeleteResumeById=(id)=>axiosClient.delete(`/user-resumes/${id}`)

const GetResumeById = (id) => 
  axiosClient.get(`/user-resumes/${id}?populate=*`);

export default {
  CreateNewResume,
  GetUserResumes,
  UpdateResumeDetail,
  GetResumeById,
  DeleteResumeById
};