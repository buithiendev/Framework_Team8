import { IconButton } from '@mui/material';
import classNames from 'classnames/bind';
import { BiTrash, BiEdit } from 'react-icons/bi';
import styles from './TableColor.module.scss';

const cx = classNames.bind(styles);

function TableColor({ colors, handleDelete, editColor }) {
    return (
        <>
            <table cellSpacing="0" cellPadding="0">
                <thead>
                    <tr>
                        <th>Name Color</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {colors?.length > 0 &&
                        colors?.map((color, index) => {
                            return (
                                <tr className={cx('table-row')} key={index}>
                                    <td>{color?.nameColor}</td>
                                    <td>{color?.priceColor}</td>
                                    <td>{color?.quantity}</td>
                                    <td>
                                        <IconButton
                                            onClick={() => {
                                                editColor(index);
                                            }}
                                        >
                                            <BiEdit />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => {
                                                handleDelete(index);
                                            }}
                                        >
                                            <BiTrash />
                                        </IconButton>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
            {colors?.length === 0 && (
                <div
                    style={{ margin: '0 auto', color: 'red', fontWeight: 500 }}
                >
                    No color
                </div>
            )}
        </>
    );
}

export default TableColor;

// {
//     {products.map((product,index) => {
// return <tr className={cx('table-row')} key={index}>
//     <td><img className={cx('img-product')} alt="" src={product.img}/></td>
//     <td>{product.title}</td>
//     <td>{product.price}</td>
//     <td>{product.quantity}</td>
//     <td><IconButton onClick={handleDelete(index)}><BiTrash/></IconButton></td>
// </tr>
// })}
// }
