import React, { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useLanguage, useLocalStorage } from '../hooks';
import './Table.css';

function TableData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [t, formatDate] = useLanguage();
    const [bookmarks, setBookmarks] = useLocalStorage('bookmarks');

    const toggleBookmark = (id) => {
        const nextBookmarks = bookmarks.find(x => x === id)
            ? bookmarks.filter(x => x !== id)
            : bookmarks.concat(id)
        setBookmarks(nextBookmarks);
    }

    async function fetchData() {
        setLoading(true);
        const res = await fetch("https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=GEN,BEZ,cases&returnGeometry=false&outSR=4326&f=json");
        res.json().then(res => {
            setData(res.features)
            localStorage.setItem('data', JSON.stringify(res.features));
        })
        setLoading(false);
    }

    useEffect(() => {
        if (!navigator.onLine) {
            setLoading(true);
            setData(JSON.parse(localStorage.getItem('data')))
            setLoading(false);
        } else {
            fetchData();
        }
    }, []);

    //replace ID
    // data.forEach((item, i) => item.id = i + 1);

    /**
     * Bookmark, id=city,value=count
     */
    const result = data.reduce((acc, x) => acc + x.attributes.cases, 0);
    const bookmarkedCities = data.filter(x => bookmarks.find(y => y === x.attributes.GEN)).map(x => ({
        ...x,
        bookmark: (
            <button
                onClick={() => toggleBookmark(x.attributes.GEN)}
                className="is-active"
            >
                <FontAwesomeIcon icon={faBookmark} />
            </button>
        )
    }));

    const chartData = data.map(x => ({
        ...x,
        bookmark: (
            <button
                onClick={() => toggleBookmark(x.attributes.GEN)}
                className={
                    bookmarks.find(y => y === x.attributes.GEN)
                        ? 'is-active'
                        : ''
                }
            >
                <FontAwesomeIcon icon={faBookmark} />
            </button>
        )
    }));

    const { SearchBar } = Search;
    const columns = [
        {
            dataField: 'attributes.GEN',
            formatter: (value, row) => {
                return value + " " + row.attributes.BEZ
            },
            text: t({
                de: 'Stadt',
                en: 'City'
            }),
            sort: true
        }, {
            dataField: 'attributes.cases',
            text: t({
                de: 'Anzahl bestätigter Fälle',
                en: 'Number of cases reported'
            }),
            sort: true
        }, {
            dataField: 'bookmark'
        }];

    return (
        <div className="container mt-2" style={{ maxWidth: 800 }}>
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
                        ? <FontAwesomeIcon icon={faSpinner} spin />
                        : result
                    }</b>
            </h4>

            <ToolkitProvider
                bootstrap4
                keyField={'attributes.GEN' + 'attributes.BEZ'}
                data={chartData}
                columns={columns}
                search={{
                    defaultSearch: (new URLSearchParams(window.location.search)).get("city")
                }}
            >
                {
                    props => (
                        <div>
                            <p>
                                {t({
                                    de: 'Tägliches Update bestätigter Fälle in deutschen Städten ',
                                    en: 'Daily update of reported cases across cities in Germany '
                                })}
                                <br className="mobile-break" />
                                {t({
                                    de: 'Speichern Sie das Ergebnis mit Lesezeichen ',
                                    en: 'Save the result with Bookmark '
                                })}
                                <FontAwesomeIcon icon={faBookmark} color="#f5cf22" />
                                <br className="mobile-break" />
                                {`(Stand ${formatDate(new Date())})`}
                            </p>

                            {
                                (bookmarkedCities.length > 0)
                                && (
                                    <React.Fragment>
                                        <h6>
                                            {t({
                                                de: 'In deinem Fokus:',
                                                en: 'Your focus:'
                                            })}
                                        </h6>
                                        <ToolkitProvider
                                            bootstrap4
                                            keyField={'attributes.GEN' + 'attributes.BEZ'}
                                            data={bookmarkedCities}
                                            columns={columns}
                                            search
                                        >
                                            {(props) => (
                                                <BootstrapTable
                                                    headerClasses="text-danger bg-dark"
                                                    striped
                                                    hover
                                                    {...props.baseProps}
                                                />
                                            )}
                                        </ToolkitProvider>
                                    </React.Fragment>
                                )
                            }
                            <SearchBar
                                style={{ marginRight: "10em" }}
                                placeholder={t({
                                    de: 'Nach Stadt oder Anzahl suchen',
                                    en: 'Search City or Number'
                                })}
                                {...props.searchProps}
                            />
                            <BootstrapTable
                                headerClasses="text-danger bg-dark"
                                striped
                                hover
                                {...props.baseProps}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>

            <h6>
                Data sources: Robert-Koch-Institut, Health Offices of the Federal States, own research
            </h6>
        </div>
    );
};

export default TableData;
