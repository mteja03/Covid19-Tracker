import React from "react";
import "./Table.css";
import numeral from "numeral";


function Table({ countries }) {
  return (
    <table className="table">
      <tbody>
        {countries.map((country) => (
          <tr key={country.country}>
            <td>
              <img
                className="table-flag"
                src={country.countryInfo.flag}
                alt={`${country.country} flag`}
              />
            </td>

            <td>{country.country}</td>
            <td>
              <strong>{numeral(country.cases).format("0,0")}</strong>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;