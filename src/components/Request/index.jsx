import { useRequest } from 'ahooks';
import Mock from 'mockjs';
import React,{useState} from 'react';

async function getUser() {
    let url = 'https://api.github.com/users/ruanyf'
    try {
        let response = await fetch(url)
        return await response.json
    } catch (e) {
        console.log(e)
    }
    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve(Mock.mock({
    //             "string|1": "zhihu"
    //         }));
    //     });
    // });
}

const Request = () => {
    const [data, setData] = useState(getUser())
    console.log(data);
    // const { data, error, loading } = useRequest(getUser());

    // if (error) {
    //     return <div>failed to load</div>;
    // }
    // if (loading) {
    //     return <div>loading...</div>;
    // }
    return <div>{data}</div>;
};

export default Request;