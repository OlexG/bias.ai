type RatingPropsType = {
    value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
}

export default function Rating({ value }: RatingPropsType) {
    const radius = 85;
    const dashArray = 2 * Math.PI * radius;
    const dashOffset = dashArray - dashArray * value / 10;
    
    return (
        <div>
        <svg className="rating" width={200} height={200} viewBox={`0 0 200 200`}>
            <circle className="circle-background" cx={100} cy={100} r={radius} strokeWidth={15} />
            <circle className="circle-progress" cx={100} cy={100} r={radius} strokeWidth={15} style={{strokeDashArray: dashArray, strokeDashOffset: dashOffset}} transform={`rotate(-90 100 100)`} />
            {/*<text className="rating__text" x="50%" y="50%" textAnchor="middle" dy="7px">{value}</text>*/}
        </svg>
        </div>
    )
}