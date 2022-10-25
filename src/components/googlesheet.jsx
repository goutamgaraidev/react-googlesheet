import React, { Component } from "react";
import { getGoogleSheet } from "../services/CardService";

class GoogleSheet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      call_str: "",
    };
  }

  componentDidMount() {
    let id = "1b4ShjzMa92-8MHepkR5Hl7I0H8sZPJ0JEyQIK4SgfPc";
    let gid = "0";
    let url =
      "https://docs.google.com/spreadsheets/d/" +
      id +
      "/gviz/tq?tqx=out:json&tq&gid=" +
      gid;
    getGoogleSheet(url)
      .then((response) => {
        let jsonString = response.data.slice(47, -2);
        var json = JSON.parse(jsonString);
        this.setState({
          data: json,
        });
      })
      .catch((error) => {
        this.setState({ data: [] });
      });
  }

  render() {
    return (
      <React.Fragment>
        <p>Google Sheet Calls</p>
        {this.state.data.table && (
          <div>
            <input
              className="form-control"
              type="text"
              name="call_str"
              value={this.state.call_str}
              onChange={(event) => {
                this.setState({ call_str: event.target.value });
              }}
            />
            <table className="table">
              <thead>
                {/* Not required
                <tr>
                  {this.state.data.table.cols.map((colonne, index) => (
                    <th key={index}> {colonne.label} </th>
                  ))}
                </tr> */}
                <tr>
                  {this.state.data &&
                    this.state.data.table.rows[0]["c"].map((cellule, index) => (
                      <th key={index}>
                        {cellule && cellule["v"] ? cellule["v"] : ""}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {this.state.data.table.rows.slice(1).map((ligne, index2) => (
                  <tr key={index2}>
                    {ligne.c[0]["v"]
                      .toLowerCase()
                      .includes(this.state.call_str.toLowerCase()) &&
                      ligne.c.map((cellule, index3) => (
                        <td key={index3}>
                          {cellule && cellule["v"] ? cellule["v"] : ""}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
      </React.Fragment>
    );
  }
}
export default GoogleSheet;
