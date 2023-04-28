// import s from '../../styles/Details.module.css'
// import React from 'react'
// import {DataPhotoType} from '@/pages/reviews'
//
// type DetailsBikeType = {
//     bike: {
//         id: string
//         name: string
//         description: string
//         price: number
//         image: string
//     }
// }
//
// const Details = ({bike}: DetailsBikeType) => {
//
//     return (
//         <div className='commonFlex'>
//             <div>
//                 <h1 className='blockTitle'>Specialized - american quality!</h1>
//             </div>
//             <div className={s.detailsItem}>
//                 <div className={s.detailsItem_image}>
//                     <img src={bike.image} alt='bike-photo'/>
//                 </div>
//                 <div className={s.detailsItem_infoBlock}>
//                     <div className={s.detailsItem_title}>{bike.name}</div>
//                     <div className={s.detailsItem_price}>${bike.price}</div>
//                     <div className={s.detailsItem_description}>{bike.description}</div>
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// export default Details
//
// // SSR (getServerSideProps = getStaticProps+getStaticPaths)
// export const getServerSideProps = async(context: { params: { id: string } }) => {
//     const response = await fetch(`http://localhost:5000/items/${context.params.id}`)
//     const data: Array<DataPhotoType> = await response.json()
//
//     if (!data) {
//         return {
//             notFound: true,
//         }
//     }
//
//     return {
//         props: {bike: data}
//     }
// }
//
// // эти два метода можно заменить на один - getServerSideProps
// /*export const getStaticPaths = async () => {
//     const response = await fetch('http://localhost:5000/items')
//     const data: Array<BikeType> = await response.json()
//
//     const paths = data.map(bike => {
//         return {
//             params: {id: bike.id}
//         }
//     })
//
//     return {
//         paths: paths,
//         // для того, чтобы в случае несуществующей страницы был редирект на 404
//         fallback: false
//     }
// }
//
// export const getStaticProps = async (context: { params: { id: string } }) => {
//     const id = context.params.id
//
//     const response = await fetch(`http://localhost:5000/items/${id}`)
//     const data: BikeType = await response.json()
//
//     return {
//         props: {bike: data}
//     }
// }*/

export default {}