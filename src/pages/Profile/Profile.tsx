import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserModel } from "../../models/userModels/userModel";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import { registerSchema } from "../../components/validationSchemas/validationSchemas";
import FormikInput from "../../components/FormikInput/FormikInput";
import userService from "../../service/baseSevice/userService";
import './profile.css';
const Profile = () => {
  const authState = useSelector((store: any) => store.auth);
  const [user, setUser] = useState<UserModel>();
  const [showForm, setShowForm] = useState(false);
  const [initialValues, setInitialValues] = useState<UserModel>({
    id: authState.id,
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const fetchUser = async () => {
    try {
      const response = await userService.getById(authState.id);
      setUser(response.data);
      setInitialValues({
        id: authState.id,
        firstName: response.data.firstName || "",
        lastName: response.data.lastName || "",
        email: response.data.email || "",
        birthDate: response.data.birthDate || "",
        username: response.data.username || "",
        password: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleUpdate = async (values: UserModel) => {
    try {

      const updatedUser = { ...values, id: authState.id };
      await userService.update(updatedUser);
      toast.success("Profil başarıyla güncellendi!");
    } catch (error: any) {
      console.error(error);
      toast.error("Profil güncellenirken bir hata oluştu.");
    }
  };

  return (

    
    <section >
      <div className="container py-5">
      <div className="container">
            <div className="row">
                <div className="col-lg-4">
                    <div className="profile-card-4 z-depth-3">
                        <div className="card">
                            <div className="card-body text-center bg-danger rounded-top">
                                <div className="user-box">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="user avatar" />
                                </div>
                                <h5 className="mb-1 text-white">{user?.firstName + " " + user?.lastName}</h5>
                               
                            </div>
                            <div className="card-body">
                                <ul className="list-group shadow-none">
                                    <li className="list-group-item">
                                        <div className="list-icon">
                                        <i className="fa fa-envelope"></i>
                                        </div>
                                        <div className="list-details">
                                            <span>{user?.email}</span>
                                            <small>Email</small>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="list-icon">
                                        <i className="fa fa-birthday-cake"></i>
                                        </div>
                                        <div className="list-details">
                                            <span>{user?.birthDate}</span>
                                            <small>Doğum Tarihi</small>
                                        </div>
                                    </li>
                                   
                                </ul>
                                <div className="row text-center mt-4">
                                <button type="button"className="btn btn-outline-primary ms-1"
                                        onClick={() => setShowForm(!showForm)}>
                                              Düzenle
                                                       </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-8">
                    <div className="card z-depth-3">
                        <div className="card-body">
                          <div className="col-lg-12">
            {showForm && (
              <div className="mb-4">
                <div className="card-body">
                  <Formik
                    initialValues={initialValues}
                    onSubmit={handleUpdate}
                    validationSchema={registerSchema}
                  >
                    <Form>
                      <FormikInput
                        label="First Name"
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                      />
                      <FormikInput
                        label="Last Name"
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                      />
                      <FormikInput
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="email"
                      />
                      <FormikInput
                        label="Birth Date"
                        name="birthDate"
                        type="date"
                        placeholder="Birth Date"
                      />
                      <FormikInput
                        label="Username"
                        name="username"
                        type="text"
                        placeholder="User Name"
                      />
                      <FormikInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Password"
                      />
                      <FormikInput
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        placeholder="confirm password"
                      />
                      <button type="submit" className="btn btn-primary mt-3">
                        Güncelle
                      </button>
                    </Form>
                  </Formik>
                </div>
              </div>
            )}
          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
 
      </div>


    </section>
  );
};

export default Profile;
