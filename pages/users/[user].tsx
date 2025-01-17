import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { Row, Col } from 'react-bootstrap';
import TableRow from '../../components/tableRow';
import Unauthorized from '../../components/unauthorized';
import { getChallengesSolved } from '../../server/challengeFunctions';
import { getAllUsers, getUserInfo } from '../../server/userFunctions';
import styles from '../../styles/profile.module.scss';

export default function UserProfile({ userData, challengeSolved }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (router.isFallback) return "Loading...";
  if (session) {
    return (
      <>
        <h1 className='txt-center'>{userData.username}&apos;s Profile</h1>
        <Row className='justify-content-center'>
          <img className={styles.imageContainer} src={userData.image} />
        </Row>
        <br />
        <Row className={styles.border}>
          <Col className='g-0'>
            <h2>User Submissions</h2>
          </Col>
        </Row>
        <br />

        <Row className='justify-content-center g-0'>
          <TableRow
            variant='header'
            left='S/N'
            middle='Challenge'
            right='Submission Time'
          />
          {challengeSolved.map((challenge, index) => {
            return (
              <TableRow
                key={index}
                left={index + 1}
                middle={challenge.title}
                right={dayjs(challenge.added).format('DD MMM YYYY, HH:mm:ss')}
                variant={index % 2 === 0 ? 'dark' : 'light'}
              />
            );
          })}
        </Row>
      </>
    );
  } else {
    return <Unauthorized />;
  }
}

export async function getStaticProps(context) {
  const userData = await getUserInfo(context.params.user);
  const challengeSolved = await getChallengesSolved(userData.id);
  return {
    props: {
      userData,
      challengeSolved,
    },
    revalidate: 300
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  };
}
