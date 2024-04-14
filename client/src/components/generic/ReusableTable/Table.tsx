interface Props {
    data: { [key: string]: any }[];
}

const Table = ({ data }: Props) => {
    const dataKeys = Object.keys(data[0])

    return (
        <table>
            <thead>
                <tr>
                    {dataKeys.map((key) => (
                        <th key={key}>{key}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((obj, index) => (
                    <tr key={index}>
                        {dataKeys.map((key) => (
                            <td key={key}>{obj[key] || ""}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table;