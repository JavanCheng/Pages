import { useEffect, useState } from 'react'
import './index.css'

const Pages = (props) => {
    const total = props.total;
    const pagerSize = props.pagerSize;
    let begin = 1;
    let len = total;
    let mid = Math.floor(pagerSize / 2);

    const initState = () => {
        const init = [];
        if (total > pagerSize) {
            len = pagerSize;
        }
        for (let i = 1; i <= len; i++) {
            init.push(i);
        }
        return init;
    }

    const [cur, setCur] = useState(1);
    const [value, setValue] = useState(1);
    const [items, setItems] = useState(initState());

    useEffect(() => {
        if (total > pagerSize) {
            if (cur >= (total - mid)) {
                begin = total - pagerSize + 1;
            } else if (cur <= 3) {
                begin = 1;
            } else {
                begin = cur - mid;
            }
        }
        let temp = []
        for (let i = 0; i < len; i++) {
            let show = begin + i;
            temp.push(show);
            setItems(temp);
        }
    }, [cur])

    const handleClick = num => {
        // console.log(num)
        setCur(num)
    }

    const handleChange = value => {
        // console.log(value)
        setValue(value);
    }

    const goNext = () => {
        if (cur < total) {
            // cur 转化为 number 类型
            setCur(cur * 1 + 1);
        }
    }

    const goPrev = () => {
        if (cur > 1) {
            setCur(cur * 1 - 1);
        }
    }

    const goPage = () => {
        console.log(value);
        if (!/^[1-9]\d*$/.test(value)) {
            alert('页码只能输入大于0的正整数');
        } else if (value > total) {
            alert('没有这么多页');
        } else {
            // value 转化为 number 类型
            setCur(value * 1);
        }
    }
    
    // test
    // console.log('cur:', cur)
    // console.log('item:', items)

    return (
        <div className="pagination-ui">
            <a className={cur === 1 ? 'prev disable' : 'prev'} onClick={() => goPrev()}></a>
            <span className="pagination-columns">
                {
                    items.map(item => {
                        return (
                            <a key={item} onClick={() => handleClick(item)} className={(item === cur) ? 'num current' : 'num'}>{item}</a>
                        )
                    })
                }
            </span>
            <a className={cur === total ? 'next disable' : 'next'} onClick={() => goNext()}></a>
            <div className="sum">
                共
                <span className="num-total">{total}</span>
                页，到第
                <input type="text" onChange={(e) => handleChange(e.target.value)} />
                页
            </div>
            <a onClick={() => goPage()} className="page-go">确定</a>
        </div>
    )
}

export default Pages;