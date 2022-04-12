import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { Modal, Button } from 'react-bootstrap'
import Navbar from "../components/Navbar";

import axios from 'axios';
import '../styles/admin.css';

const BASE_URL =process.env.REACT_APP_SERVER_URL



function Admin() {
        const [userList, setUserList] = useState([]);
        const [userDetail, setUserDetail] = useState({});
        const [userModal, setUserModal] = useState(false);
        const [message, setMessage] = useState("");
        const currUserName = useState(localStorage.getItem("name"));
        const showUserModal = () => setUserModal(true);
        const closeUserModal = () => {
            setUserModal(false);
            setUserDetail({});
        }

        useEffect(() => {
          (async () => {
              fetchUsers("")
          })();
        }, []);


        const fetchUsers = (userId) => {
          axios.get(BASE_URL + '/crm/api/v1/users/' + userId, {
              headers: {
                  'x-access-token': localStorage.getItem("token")
              }
          }).then(function (response) {
              if (response.status === 200) {
                  if (userId) {
                      setUserDetail(response.data[0])
                      showUserModal()
                  }
                  else
                      setUserList(response.data);
              }
          })
              .catch(function (error) {
                  console.log(error);
              });
        }

        const updateUserDetail = () => {
          const data = {
              "userType": userDetail.userTypes,
              "userStatus": userDetail.userStatus,
              "userName": userDetail.name
          }
          axios.put(BASE_URL + '/crm/api/v1/users/' + userDetail.userId,data, {
              headers: {
                  'x-access-token': localStorage.getItem("token")
              }
          },{
              "userId":localStorage.getItem("userId")
          }).then(function (response) {
              if (response.status === 200) {
                  setMessage(response.message);
                  let idx = userList.findIndex((obj => obj.userId == userDetail.userId));
                  userList[idx] = userDetail
                  closeUserModal();
  
              }
          })
              .catch(function (error) {
                  if (error.status === 400)
                      setMessage(error.message);
                  else
                      console.log(error);
              });
      }
  
      const changeUserDetail = (e) => {
          if (e.target.name === "status")
              userDetail.userStatus = e.target.value
          else if (e.target.name === "name")
              userDetail.name = e.target.value
          else if (e.target.name === "type")
              userDetail.userTypes = e.target.value
          setUserDetail(userDetail)
          setUserModal(e.target.value);
      }
  
      return (
          <div className="bg-light">
              <Navbar />
              <div className="container">
                  <h3 className="text-primary text-center">Welcome, {currUserName}</h3>
                  <p className="text-muted text-center">Take a quick looks at your admin stats below. </p>
  
                  {/* card */}
                  <div className="row my-5 text-center">
  
                      <div className="col">
                          <div className="card shadow  bg-success" style={{ width: 16 + 'rem' }}>
                              <div className="card-body">
                                  <h5 className="card-subtitle mb-2 text-white">Completed</h5>
                                  <hr />
                                  <div className="col text-white">Some value</div>
                              </div>
                          </div>
                      </div>
  
                      <div className="col">
                          <div className="card shadow bg-warning" style={{ width: 16 + 'rem' }}>
                              <div className="card-body">
                                  <h5 className="card-subtitle mb-2 text-white">Warning</h5>
                                  <hr />
                                  <div className="col text-white">Some value</div>
                              </div>
                          </div>
                      </div>
  
                      <div className="col">
                          <div className="card shadow bg-primary" style={{ width: 16 + 'rem' }}>
                              <div className="card-body">
                                  <h5 className="card-subtitle mb-2 text-white">Primary</h5>
                                  <hr />
                                  <div className="col text-white">Some value</div>
                              </div>
                          </div>
                      </div>
  
                      <div className="col">
                          <div className="card shadow bg-danger" style={{ width: 16 + 'rem' }}>
                              <div className="card-body">
                                  <h5 className="card-subtitle mb-2 text-white">Pending</h5>
                                  <hr />
                                  <div className="col text-white">Some value</div>
                              </div>
                          </div>
                      </div>
  
                  </div>
  
                 <hr />
  
                  
                  {/* <MuiThemeProvider theme={theme}> */}
                  <MaterialTable
                      onRowClick={(event, rowData) => fetchUsers(rowData.userId)}
  
                      data={userList}
                      columns={[
                          {
                              title: "USER ID",
                              field: "userId",
                          },
                          {
                              title: "Name",
                              field: "name",
  
                          },
                          {
                              title: "EMAIL",
                              field: "email",
                              filtering: false
                          },
                          {
                              title: "ROLE",
                              field: "userTypes",
                              lookup: {
                                  "ADMIN": "ADMIN",
                                  "CUSTOMER": "CUSTOMER",
                                  "ENGINEER": "ENGINEER",
  
                              },
                          },
                          {
                              title: "Status",
                              field: "userStatus",
                              lookup: {
                                  "APPROVED": "APPROVED",
                                  "PENDING": "PENDING",
                                  "REJECTED": "REJECTED",
  
                              },
                          },
                      ]}
                      options={{
                          filtering: true,
                          sorting: true,
                          exportMenu: [{
                              label: 'Export PDF',
                              exportFunc: (cols, datas) => ExportPdf(cols, datas, 'userRecords')
                          }, {
                              label: 'Export CSV',
                              exportFunc: (cols, datas) => ExportCsv(cols, datas, 'userRecords')
                          }],
                          headerStyle: {
                              backgroundColor: '#106cfc',
                              color: '#FFF'
                            },
                            rowStyle: {
                              backgroundColor: '#EEE',
                            }
                      }}
                      title="USER RECORDS"
                  />
                  {/* </MuiThemeProvider>  */}
  
  
  
                  {userModal ? (
  
                      <Modal
                          show={userModal}
                          onHide={closeUserModal}
                          backdrop="static"
                          keyboard={false}
                          centered
                      >
                          <Modal.Header closeButton>
                              <Modal.Title >Edit Details</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                              <form onSubmit={updateUserDetail} >
  
                                  <div className="p-1">
                                      <h5 className="card-subtitle mb-2 text-primary lead">User ID: {userDetail.userId}</h5>
                                      <hr />
                                      <div class="input-group mb-3">
                                          <span class="input-group-text" id="basic-addon2">Name</span>
                                          <input type="text" className="form-control" name="name" value={userDetail.name} onChange={changeUserDetail} />
  
                                      </div>
                                      <div class="input-group mb-3">
                                          <span class="input-group-text" id="basic-addon2">Email</span>
                                          <input type="text" className="form-control" name="name" value={userDetail.email} onChange={changeUserDetail} disabled />
  
                                      </div>
  
                                      <div class="input-group mb-3">
                                          <span class="input-group-text" id="basic-addon2">Type</span>
                                          <select className="form-select" name="type" value={userDetail.userTypes} onChange={changeUserDetail}>
                                              <option value="ADMIN">ADMIN</option>
                                              <option value="CUSTOMER">CUSTOMER</option>
                                              <option value="ENGINEER">ENGINEER</option>
                                          </select>
  
                                      </div>
  
                                      <div class="input-group mb-3">
                                          <span class="input-group-text" id="basic-addon2">Status</span>
                                          <select name="status" className="form-select"
                                              value={userDetail.userStatus} onChange={changeUserDetail}>
                                              <option value="APPROVED">APPROVED</option>
                                              <option value="REJECTED">REJECTED</option>
                                              <option value="PENDING">PENDING</option>
                                          </select>
  
                                      </div>
  
                                  </div>
  
                              </form>
                          </Modal.Body>
                          <Modal.Footer>
                              <Button variant="secondary" onClick={() => closeUserModal()}>
                                  Close
                              </Button>
                              <Button variant="primary" onClick={() => updateUserDetail()}>Update</Button>
                          </Modal.Footer>
                      </Modal>
  
                  ) : (
                      ""
                  )}
                   
              </div>
  
          </div>
      )
  
  }
  
  export default Admin;
