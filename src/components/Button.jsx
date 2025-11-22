export function Button({txt, styles, url}){
    return (<>
        <a className={styles} href={url} >{txt}</a>

    </>)
}