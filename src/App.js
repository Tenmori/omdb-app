import React, {useEffect, useState} from 'react';
import
{
    Layout, 
    Input, 
    Row, 
    Col, 
    Card, 
    Tag, 
    Typography 
} from 'antd';
import 'antd/dist/antd.css';

const API_KEY = '4df660a6';
const Text = Typography.Title;
const { Search } = Input;
const { Button } = Input;

const SearchBar = ({searchHandler}) => 
{
    return (
        <Row>
            <Col span={12} offset={6}>
                <Search
                    placeholder="Search By Movie, Series, Episode"
                    enterButton="Search"
                    size="large"
                    onSearch={value => searchHandler(value)}
                />
            </Col>
        </Row>
    )
}

const ContentPreview = ({Title, Year, Poster, imdbID}) =>
{
    const [plot, setPlot] = useState(null);

    useEffect(() => {
        fetch(`https://omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`)
        .then(response => response.json())
        .then(r => {
            if (r.Plot !== 'False')
            {
                setPlot(r.Plot)
            }
        })
    });

    return (
        <Col span={4}>
            <div>
                <Card
                    style={{ width: 200, height: 300}}
                    cover={
                        <img
                            alt={Title}
                            src={Poster === 'N/A' ? "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png" : Poster}
                        />
                    }
                />
                <Card style={{ height: 90, overflow: "hidden"}}>
                    {Title} - {Year}
                </Card>
                <Row type="flex" justify="center" style={{padding: 5}}>
                    <input value="Read More" type="button" title={plot} />
                </Row>
            </div>
        </Col>
    )
}

function App() {
    const [data, setData] = useState(null);
    const [query, setQuery] = useState('');

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`)
        .then(response => response.json())
        .then(r => {
            if (r.Response !== 'False')
            {
                setData(r.Search);
            }
        })
    }, [query]);

    return(
        <div className="App">
            <Layout className="layout">
                <Layout>
                    <div style={{ background: '#000752', textAlign: 'center'}}>
                        <Text style={{color: '#b5b5b5', marginTop: '24px'}}>OMDB API + React</Text>
                    </div>
                </Layout>
                <Layout style={{ padding: '0 75px' }}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <SearchBar searchHandler={setQuery} />
                        <br />
                        <Row gutter={16} type="flex" justify="center">
                            { data !== null && data.length > 0 && data.map((result, index) => (
                                <ContentPreview 
                                    key={index} 
                                    {...result} 
                                />
                            ))}
                        </Row>
                    </div>
               </Layout>
            </Layout>
        </div>
    );
}

export default App;
