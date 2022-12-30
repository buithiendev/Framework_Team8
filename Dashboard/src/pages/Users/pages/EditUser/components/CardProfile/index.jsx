import { Avatar } from '@mui/material';
import classNames from 'classnames/bind';
import logo from '~/assets/images/0_0_13.png';
import Button from '~/components/Button';
import HighLight from '~/components/HighLight';
import styles from './CardProfile.module.scss';

const cx = classNames.bind(styles);

function CardProfile({ currentUser }) {
    return (
        <div className={cx('group__card-profile')}>
            <div className={cx('card-profile')}>
                <div className={cx('quick-view')}>
                    <Avatar
                        alt="avatar"
                        src={logo}
                        sx={{ width: 110, height: 110 }}
                    />
                    <h3>{`${currentUser.firstName} ${currentUser.lastName}`}</h3>
                    <p>Project Manager</p>
                    <Button outline small style={{ fontSize: 12 }}>
                        Update Profile Picture
                    </Button>
                </div>
                <div className={cx('show-active')}>
                    {currentUser.status ? (
                        <HighLight primary small>
                            Is Active
                        </HighLight>
                    ) : (
                        <HighLight outline small>
                            Non-Active
                        </HighLight>
                    )}
                </div>
                <div className={cx('description')}>
                    <h5>Description</h5>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Odio eaque, quidem, commodi soluta qui quae minima
                        obcaecati quod dolorum sint alias, possimus illum
                        assumenda eligendi cumque?
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CardProfile;
