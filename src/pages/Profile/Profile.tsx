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
        <div className="row">
          <div className="col">
            <nav
              aria-label="breadcrumb"
              className="bg-light rounded-3 p-3 mb-4"
            >
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <a href="#">Profil</a>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <div className=" mb-4">
              <div className="cards text-center">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/003/543/444/non_2x/male-and-female-symbol-human-profile-icon-or-people-icon-man-and-woman-sign-and-symbol-free-vector.jpg"
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: "115px" }}
                />
                <h5 >
                  {user?.firstName + " " + user?.lastName}
                </h5>

                <div className="d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-outline-primary ms-1"
                    onClick={() => setShowForm(!showForm)}
                  >
                    Düzenle
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="cards mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Adı</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user?.firstName}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Soyadı</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user?.lastName}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Doğum Tarihi</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user?.birthDate}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user?.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Kullanıcı Adı</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user?.username}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
    </section>
  );
};

export default Profile;
