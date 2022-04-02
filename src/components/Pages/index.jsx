import { useEffect, useState } from 'react'
import './index.css'
const Pages = (props) => {
    const total = props.total;
    const init = [];
    for (let i = 1; i <= total && init.length < 5; i++) {
        init.push(i);
    }
    const [cur, setCur] = useState(1);
    const [value, setValue] = useState('')
    const [items, setItems] = useState(init);
    const [begin, setBegin] = useState(0);
    const [len, setLen] = useState(0);

    useEffect(() => {
        if (total > 5) {
            setLen(5);
            if (cur >= (total - 2)) {
                setBegin(total - 4);
            } else if (cur <= 3) {
                setBegin(1);
            } else {
                setBegin(cur - 2);
            }
        } else {
            setLen(total);
            setBegin(1);
        }
        let temp = []
        for (let i = 0; i < len; i++) {
            let showItem = begin + i;
            temp.push(showItem);
            setItems(temp);
        }
    }, [cur])

    const handleClick = num => {
        setCur(num)
    }

    const handleChange = value => {
        console.log(value)
        setValue(value);
    }

    const goNext = () => {
        if (cur < total) {
            setCur(cur + 1);
        }
    }

    const goPrev = () => {
        if (cur > 1) {
            setCur(cur - 1);
        }
    }

    const goPage = () => {
        if (!/^[1-9]\d*$/.test(value)) {
            alert('页码只能输入大于0的正整数');
        } else if (value > total) {
            alert('没有这么多页');
        } else {
            setCur(value);
        }
    }

    return (
        <div className="pagnation-ui">
            <a className={cur === 1 ? 'prev disable' : 'prev'} onClick={() => goPrev()}></a>
            <span className="pagnation-columns">
                {
                    items.map(item => {
                        return (
                            <a key={item} onClick={() => handleClick(item)} className={item === cur ? 'num current' : 'num'}>{item}</a>
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