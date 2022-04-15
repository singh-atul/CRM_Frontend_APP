import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { Modal, Button } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import axios from 'axios';
import '../styles/admin.css';

const BASE_URL =process.env.REACT_APP_SERVER_URL



function Admin() {
        const [userList, setUserList] = useState([]);
        const [userDetail, setUserDetail] = useState({});
        const [ticketDetails, setTicketDetails] = useState([]);
        const [ticketUpdateModal, setTicketUpdateModal] = useState(false);
        const [selectedCurrTicket, setSelectedCurrTicket] = useState({});
        const [ticketStatusCount, setTicketStatusCount] = useState({});

        const updateSelectedCurrTicket = (data) => setSelectedCurrTicket(data)

        const closeTicketUpdationModal = () => setTicketUpdateModal(false)


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
              fetchTickets()
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

        const fetchTickets = () => {
            axios.get(BASE_URL + '/crm/api/v1/tickets/',
                {
                    headers: {
                    'x-access-token': localStorage.getItem("token")
                }
              },{
                    "userId":localStorage.getItem("userId")
                }
            ).then(function (response) {
                if (response.status === 200) {                    
                      setTicketDetails(response.data);
                      updateTicketCounts(response.data);
                      
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
      
      const editTicket = (ticketDetail) =>{
        const ticket={
            assignee: ticketDetail.assignee,
            description: ticketDetail.description,
            id:ticketDetail.id,
            reporter: ticketDetail.reporter,
            status: ticketDetail.status,
            title:ticketDetail.title,
            ticketPriority:ticketDetail.ticketPriority
        }
        setSelectedCurrTicket(ticket)
        setTicketUpdateModal(true)
      }

      const updateTicketCounts = (tickets) =>{
        const data = {
            pending:0,
            closed:0,
            progress:0,
            blocked:0

        }
        tickets.map(x=>{
            if(x.status=="OPEN")
                data.pending+=1
            else if(x.status=="IN_PROGRESS")
                data.progress+=1
            else if(x.status=="BLOCKED")
                data.blocked+=1
            else
                data.closed+=1
        })
        setTicketStatusCount(Object.assign({}, data))
    }

    const onTicketUpdate = (e)=>{
        if(e.target.name=="title")
            selectedCurrTicket.title = e.target.value
        else if(e.target.name==="description")
            selectedCurrTicket.description = e.target.value
          else if(e.target.name==="status")
            selectedCurrTicket.status = e.target.value
        else if(e.target.name=="assignee")
            selectedCurrTicket.assignee = e.target.value
        else if(e.target.name=="ticketPriority")
            selectedCurrTicket.ticketPriority = e.target.value


            

        console.log(selectedCurrTicket)
        
        updateSelectedCurrTicket(Object.assign({}, selectedCurrTicket) )
    }

    const updateTicket = (e) =>{
        e.preventDefault()
        axios.put(BASE_URL + '/crm/api/v1/tickets/'+ selectedCurrTicket.id,selectedCurrTicket, {
            headers: {
                'x-access-token': localStorage.getItem("token")
            }
        },{
            "userId":localStorage.getItem("userId")
        }).
        then(function (response){
            setMessage("Ticket Updated Successfully");
            closeTicketUpdationModal();
            fetchTickets();

        }).catch(function (error){
            if (error.status === 400)
                setMessage(error.message);
            else if(error.status === 401)
                setMessage("Authorization error, retry loging in");
                closeTicketUpdationModal();
            console.log(error.message);
        })


      }

      return (
          <div className="bg-light">
            <div className="col-1"><Sidebar home='/' /></div>

              <div className="container vh-100%">
                  <h3 className="text-primary text-center">Welcome, {currUserName}</h3>
                  <p className="text-muted text-center">Take a quick looks at your admin stats below. </p>
  
                  {/* card */}
                  <div className="row my-5 mx-2 text-center">
  
                        <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                            <div className="card  cardItem shadow  bg-primary text-dark bg-opacity-25 borders-b" style={{ width: 15 + 'rem' }}>
                                <div className="card-body">
                                    <h5 className="card-subtitle mb-2"><i class="bi bi-pencil text-primary mx-2"></i>Open </h5>
                                    <hr />
                                    <div className="row">
                                        <div className="col">  
                                            <h1 className="col text-dark mx-4">{ticketStatusCount.pending}</h1> 
                                        </div>
                                        <div className="col">
                                            <div style={{ width: 40, height: 40 }}>
                                                <CircularProgressbar value={ticketStatusCount.pending} styles={buildStyles({
                                                        textColor: "red",
                                                        pathColor: "darkblue",
                                                    })} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                      </div>
  
                      <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                            <div className="card shadow  bg-warning text-dark bg-opacity-25 borders-y" style={{ width: 15 + 'rem' }}>
                                <div className="card-body">
                                    <h5 className="card-subtitle mb-2"><i class="bi bi-lightning-charge text-warning mx-2"></i>Progress </h5>
                                    <hr />
                                    <div className="row">
                                        <div className="col">  <h1 className="col text-dark mx-4">{ticketStatusCount.progress} </h1> </div>
                                        <div className="col">
                                            <div style={{ width: 40, height: 40 }}>
                                                <CircularProgressbar value={ticketStatusCount.progress} styles={buildStyles({
                                                    textColor: "red",
                                                    pathColor: "darkgoldenrod",
                                                })} />
                                            </div>
                                        </div>
                                    </div>
                              </div>
                          </div>
                      </div>
  
                      <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                                <div className="card shadow  bg-success text-dark bg-opacity-25 borders-g" style={{ width: 15 + 'rem' }}>
                                    <div className="card-body">
                                        <h5 className="card-subtitle mb-2"><i class="bi bi-check2-circle text-success mx-2"></i>Closed </h5>
                                        <hr />
                                        <div className="row">
                                            <div className="col">  <h1 className="col text-dark mx-4">{ticketStatusCount.closed}</h1> </div>
                                            <div className="col">
                                                <div style={{ width: 40, height: 40 }}>
                                                    <CircularProgressbar value={ticketStatusCount.closed} styles={buildStyles({
                                                        textColor: "red",
                                                        pathColor: "darkolivegreen",
                                                    })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
  
                            <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                                <div className="card shadow  bg-secondary text-dark bg-opacity-25 borders-grey" style={{ width: 15 + 'rem' }}>
                                    <div className="card-body">
                                        <h5 className="card-subtitle mb-2"><i class="bi bi-slash-circle text-secondary mx-2"></i>Blocked </h5>
                                        <hr />
                                        <div className="row">
                                            <div className="col">  <h1 className="col text-dark mx-4">{ticketStatusCount.blocked}</h1> </div>
                                            <div className="col">
                                                <div style={{ width: 40, height: 40 }}>
                                                    <CircularProgressbar value={ticketStatusCount.blocked} styles={buildStyles({
                                                        textColor: "red",
                                                        pathColor: "black",
                                                    })} />
                                                </div>
                                            </div>
                                        </div>
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
                              backgroundColor: 'darkblue',
                              color: '#FFF'
                            },
                            rowStyle: {
                              backgroundColor: '#EEE',
                            }
                      }}
                      title="USER RECORDS"
                  />
                  {/* </MuiThemeProvider>  */}
                  <br />
                  <MaterialTable
                      onRowClick={(event,rowData) => editTicket(rowData)}
  
                      data={ticketDetails}
                      columns={[
                          {
                              title: "Ticket ID",
                              field: "id",
                          },
                          {
                              title: "TITLE",
                              field: "title",
  
                          },
                          {
                              title: "DESCRIPTIONS",
                              field: "description",
                              filtering: false
                          },
                          {
                              title: "REPORTER",
                              field: "reporter",
                          },
                          {
                              title: "PRIORITY",
                              field: "ticketPriority",
                          },
                          {
                              title: "ASSIGNEE",
                              field: "assignee",
                          },
                          {
                              title: "Status",
                              field: "status",
                              lookup: {
                                  "OPEN": "OPEN",
                                  "IN_PROGRESS": "IN_PROGRESS",
                                  "BLOCKED": "BLOCKED",
                                  "CLOSED":"CLOSED"
  
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
                              backgroundColor: 'darkblue',
                              color: '#FFF'
                            },
                            rowStyle: {
                              backgroundColor: '#EEE',
                            }
                      }}
                      title="TICKETS RECORD"
                    />
  
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


{
                    ticketUpdateModal ? (
                        <Modal
                          show={ticketUpdateModal}
                          onHide={closeTicketUpdationModal}
                          backdrop="static"
                          keyboard={false}
                          centered
                      >
                          <Modal.Header closeButton>
                              <Modal.Title >UPDATE TICKET</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form onSubmit={updateTicket} >
                                <div className="p-1">
                                      <h5 className="card-subtitle mb-2 text-primary lead">Ticket ID: {selectedCurrTicket.id}</h5>
                                      <hr />
                                      <div class="input-group mb-3">
                                          <span class="input-group-text" id="basic-addon2">Title</span>
                                          <input type="text" className="form-control" name="title" value={selectedCurrTicket.title} onChange={onTicketUpdate} required/>
  
                                      </div>
                                      
                                      <div class="input-group mb-3">
                                          <span class="input-group-text" id="basic-addon2">Assignee</span>
                                      <select className="form-select" name="assignee" value={selectedCurrTicket.assignee} onChange={onTicketUpdate}>
                                                {
                                                    userList.filter((user)=>{
                                                        return user.userTypes=="ENGINEER"
                                                    }).map((user) => 
                                                    <option value={user.name}>{user.name}</option>
                                                    )
                                                }
                                        </select>
                                    </div>

                                      <div class="input-group mb-3">
                                          <span class="input-group-text" id="basic-addon2">Status</span>
                                          <select className="form-select" name="status" value={selectedCurrTicket.status} onChange={onTicketUpdate}>
                                              <option value="OPEN">OPEN</option>
                                              <option value="CLOSED">CLOSED</option>
                                          </select>
                                                                                </div>
                                      <div class="md-form amber-textarea active-amber-textarea-2">
                                        <textarea id="form16" class="md-textarea form-control" rows="3" name="description" placeholder="Description" value={selectedCurrTicket.description}  onChange={onTicketUpdate} required></textarea>
                                      </div>

                                      <div class="input-group mb-3">
                                          <span class="input-group-text" id="basic-addon2">PRIORITY</span>
                                          <input type="text" className="form-control" name="ticketPriority" value={selectedCurrTicket.ticketPriority} onChange={onTicketUpdate} required/>
  
                                      </div>
                                  </div>
                                
                                <Button variant="secondary" onClick={() => closeTicketUpdationModal()}>Cancel</Button>
                                <Button type="submit" variant="primary" >Update</Button>
                            </form>
                          </Modal.Body>
                          <Modal.Footer>
                          </Modal.Footer>


                      </Modal>
                    ):(
                        ""
                    )

                }
                   
              </div>
  
          </div>
      )
  
  }
  
  export default Admin;
