import React, { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { useLanguage } from '../hooks';

function TableData() {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    //const [city, setCity] = useState("");
    const [t, formatDate] = useLanguage();


    async function fetchData() {
        setLoading(true);
        const res = await fetch("https://backend-sql.herokuapp.com/covids");
        res.json().then(res => setChartData(res))
        setLoading(false)
    }

    async function fetchParameter() {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        //var city = params.get('city') || params.get('stadt');
        //var city = " "
        //setCity(params.get("city"));
        //console.log(city)
    }

    useEffect(() => {
        fetchData();
        fetchParameter();
    }, []);

    const result = chartData.reduce((acc, x) => acc + x.value, 0);

    const { SearchBar } = Search;

    const columns = [
        {
            dataField: 'label',
            text: t({
                de: 'Stadt',
                en: 'City'
            }),
            sort: true
        }, {
            dataField: 'value',
            text: t({
                de: 'Anzahl bestätigter Fälle',
                en: 'Number of cases reported'
            }),
            sort: true
        }];

    return (
        <div className="container mt-2" >
            <h1 className="my-4">
                Coronavirus Live Tracker <small>(COVID-19)</small>
            </h1>
            <h4>
                {t({
                    de: 'Anzahl bestätigter Fälle in Deutschland: ',
                    en: 'Number of cases reported in Germany: '
                })}
                <b className="text-danger" style={{ fontStyle: 'normal' }}>
                    {(loading || result === 0)
                        ? "Loading" //ut a spinner
                        : result
                    }</b></h4>
            <ToolkitProvider
                bootstrap4
                keyField='id'
                data={chartData}
                columns={columns}
                search={{
                    defaultSearch: (new URLSearchParams(window.location.search)).get("city")
                }}
            >
                {
                    props => (
                        <div>
                            <div className="d-flex justify-content-between">
                                <p>

                                    {t({
                                        de: 'Tägliches Update bestätigter Fälle in deutschen Städten',
                                        en: 'Daily update of reported cases across cities in Germany'
                                    })}
                                    <br className="mobile-break" />
                                    {`(Stand ${formatDate(new Date())})`}
                                </p>
                                <SearchBar
                                    style={{ marginRight: "10em" }}
                                    placeholder={t({
                                        de: 'Nach Stadt oder Anzahl suchen',
                                        en: 'Search City or Number'
                                    })}
                                    {...props.searchProps}
                                />
                            </div>

                            <BootstrapTable
                                headerClasses="text-danger bg-dark"
                                striped
                                hover
                                condensed
                                {...props.baseProps}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>

            <h6>Data sources: Robert-Koch-Institut, Health Offices of the Federal States, own research</h6>
        </div>
    );
};
export default TableData;