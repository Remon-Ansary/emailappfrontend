import axios from "axios"
import React, { useState, useEffect } from "react"

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/bulkemail")
      .then((res) => {
        setData(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    axios
      .post("http://127.0.0.1:8000/api/bulkemail", { email })
      .then((res) => {
        console.log("Email added successfully")

        axios
          .get("http://127.0.0.1:8000/api/bulkemail")
          .then((res) => {
            setData(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
      })

    setEmail("")
  }

  const handleSendEmail = (e) => {
    e.preventDefault()

    axios
      .post("http://127.0.0.1:8000/api/sendemail", {
        receiver_email: recipientEmail,
      })
      .then((res) => {
        console.log("Email sent to the user")
      })
      .catch((err) => {
        console.log(err)
      })

    setRecipientEmail("")
  }

  const handleSendBulkEmail = () => {
    axios
      .get("http://127.0.0.1:8000/api/sendbulkemail")
      .then((res) => {
        console.log("Email sent to all email addresses")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="container">
      <div>
        <h3>Create Bulk List</h3>
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Email</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.email}</td>
                <td>{item.created_at.split("T")[0]}</td>
              </tr>
            ))}
            <button
              className="btn btn-success mt-3"
              onClick={handleSendBulkEmail}
              disabled={data.length === 0}
            >
              Send Email to All
            </button>
          </tbody>
        </table>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Add Email to Bulk List</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <br />
      <br />
      <div>
        <h3>Send Email to Single User</h3>

        <form onSubmit={handleSendEmail}>
          <div className="form-group">
            <label>Recipient Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter recipient email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Send Email
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
