import "./bootstrap.css"
import { selectUserName, selectUserEmail, selectUserReservations } from "../features/user/userSlice";
import { useSelector } from "react-redux";

const Dashboard = (props) => {
  const userName = useSelector(selectUserName);
  const reservations = useSelector(selectUserReservations);
  const userEmail = useSelector(selectUserEmail)
  const reservedForDisplay = []
  reservations.map((reservation,key) => {
    reservedForDisplay.push(
      <div className="card" key={key}>
        <div className="card-body">
          <div className="flex flex-column align-items-center text-left">
            <div className="row">
              <h2 className="d-flex align-items-center text-info mb-5">🎟 Movie Ticket 🎟</h2>
            </div>
            <div className="row">
              <div className="col-sm-3"><h6 className="mb-0">Title</h6></div>
              <div className="col-sm-9 text-secondary">{reservation[0]}</div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3"><h6 className="mb-0">Theatre</h6></div>
              <div className="col-sm-9 text-secondary">{reservation[1]}</div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3"><h6 className="mb-0">Time</h6></div>
              <div className="col-sm-9 text-secondary">{reservation[2]}</div>
            </div>
            <hr/>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm">

            {/* User Icon */}
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150"/>
                  <div className="mt-3">
                    <h3>{userName}</h3>
                    {/* <p className="text-secondary mb-1">Moto</p> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Info */}
            <div className="card">
              <div className="card-body">
                <div className="flex flex-column align-items-center text-left">
                  <div className="row">
                    <div className="col-sm-3"><h6 className="mb-0">Name</h6></div>
                    <div className="col-sm-9 text-secondary">{userName}</div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3"><h6 className="mb-0">Email</h6></div>
                    <div className="col-sm-9 text-secondary">{userEmail}</div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3"><h6 className="mb-0">Phone</h6></div>
                    <div className="col-sm-9 text-secondary">(239) 816-9029</div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3"><h6 className="mb-0">Mobile</h6></div>
                    <div className="col-sm-9 text-secondary">(320) 380-4539</div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3"><h6 className="mb-0">Address</h6></div>
                    <div className="col-sm-9 text-secondary">116 Hoy Rd, Ithaca, NY, 14853</div>
                  </div>
                  <hr/>
                </div>
              </div>
            </div>

            {/* Reserved Movies Starts Here */}
            {reservedForDisplay}

          </div>
        </div>
      </div>
    </div>
  )
}

const h2Style = {
  "textAlign": 'center',
}

export default Dashboard;
