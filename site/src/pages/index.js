import React from 'react';
import { navigate } from 'gatsby';
import BannerImg from '../images/homeBanner.png';
import Meta from '../../../gatsby-theme-mds/src/components/Meta';
import Homepage from '../../../gatsby-theme-mds/src/templates/Homepage';
import Footer from '../../../gatsby-theme-mds/src/components/Footer/Footer';
import { MediumBlogs } from '../util/MediumBlogs';
import { useHomeMenu } from '../util/HomeMenu';
import { MdsChangelog } from '../util/MdsChangelog';
import '../css/homepage.css';
import {
  Row,
  Column,
  Heading,
  Button,
  Card,
  Badge,
  Text,
  Icon,
  Link,
  Subheading
} from '@innovaccer/design-system';

const Home = () => {

  const mediumBlogList = MediumBlogs().slice(0, 3);
  const menuSection = useHomeMenu();
  const changelog = MdsChangelog();

  const releaseDate = new Date(changelog.releaseDate).toString().slice(3, 15);

  return (
    <Homepage relativePagePath={'/404'} is404={true}>
      <Meta titleType='page' pageTitle='Masala Design System' />
      <Row className="h-100">
        <Column className="page-animation">

          <section className="pl-12 pt-8">
            <Row className="align-items-center">
              <Column>
                <Text weight='medium'>Welcome to</Text>
                <Heading size='xl' className='mt-2 home-text-color'>Masala Design System</Heading>
                <Heading size='m' className='mt-4 font-weight--normal home-text-color'>
                  Designers, developers, product managers, and UXer's use
                  Innovaccer's Masala Design System to build products effortlessly,
                  fearlessly, and conveniently.
                </Heading>
                <br />
                <Button
                  appearance='primary'
                  onClick={() => navigate('/introduction/get-started/developers/')}
                >
                  Get started
                </Button>
                <br />
              </Column>
              <Column>
                <img src={BannerImg} width="100%" alt="banner_img" />
              </Column>
            </Row>
          </section>

          <section className="px-12 py-11 home-menu">
            <Row>
              {
                menuSection.map((menuItem, key) => {
                  return (
                    <Column size={3} key={key}>
                      <Link href={menuItem.link}>
                        <Card
                          className='mr-7 p-6 h-100 overflow-visible'
                          shadow='none'
                        >
                          <Row>
                            <div className='border-radius--rounded px-3 pt-3 mb-5' style={{ backgroundColor: `var(--${menuItem.appearance}-lightest)` }}>
                              <Icon
                                name={menuItem.icon}
                                appearance={menuItem.appearance}
                                size={24}
                              />
                            </div>
                          </Row>
                          <Heading size='s' className='mb-4 home-text-color'>{menuItem.name}</Heading>
                          <Text appearance='subtle' className='font-weight--normal'>
                            {menuItem.content}
                          </Text>
                        </Card>
                      </Link>
                    </Column>
                  )
                })
              }
            </Row>
          </section>

          <section className="px-12 py-11">
            <Row>
              <Column className='mr-8'>
                <div className='d-flex'>
                  <Heading size='m' className='mb-4 home-text-color'>Masala Design System v{(changelog.version).trim()}</Heading>
                  <div>
                    <Badge appearance="success" className='ml-4 mt-3'> NEW </Badge>
                  </div>
                </div>
                <div>
                  <Subheading appearance="subtle">{releaseDate}</Subheading>
                  <div>
                    {changelog.updatesList.map((updates) => {
                      return (
                        updates.map((item, key) => {
                          if (key === 0) {
                            return (
                              <div className="mt-4">
                                <Text weight='strong' className="home-text-color">{item}</Text>
                              </div>
                            )
                          } else {
                            return (
                              <div className="list">
                                <li>
                                  <Text appearance='subtle' size='small' weight='medium'>
                                    {item}
                                  </Text>
                                </li>
                              </div>
                            )
                          }
                        })
                      )
                    })
                    }
                  </div>
                  <Link href={'/introduction/what\'s-new/'}> View all updates</Link>
                </div>
              </Column>
              <Column>
                <Heading size='m' className="home-text-color">Blogs by Innovaccer Design</Heading>
                <br />

                {
                  mediumBlogList.map((blog, key) => {
                    return (
                      <div className="d-flex mb-7" key={key}>
                        <div>
                          <img src={`https://miro.medium.com/fit/c/28/28/${blog.author.imageId}`} alt="author_img" className="border-radius--rounded mr-4" />
                        </div>
                        <div>
                          <Link href={`https://medium.com/innovaccer-design/${blog.uniqueSlug}`} target="_blank" >
                            {blog.title}
                          </Link>
                          <br />
                          <Text appearance='subtle' size='small' weight='medium'>
                            {'by ' + blog.author.name}
                          </Text>
                        </div>
                      </div>
                    )
                  })
                }
                <Link href='https://medium.com/innovaccer-tech' target="_blank">
                  More blogs
                </Link>
              </Column>
            </Row>
          </section>

          <section className="px-12 py-11 bg-secondary-lightest">
            <Heading size='xl' className="home-text-color">Resources</Heading>
            <Row className="mt-8">
              <Column size='6'>
                <Link href='/resources/'>
                  <Card
                    className='mr-7 p-6 h-100 overflow-visible'
                    shadow='none'
                  >
                    <div className='d-flex'>
                      <div></div>
                      <div>
                        <Heading size='m' className="mb-2 home-text-color">Figma UI Library</Heading>
                        <Text appearance='subtle' className='font-weight--normal'>
                          Use our Masala Design System  UI Kit to mock up pages and prototypes.
                        </Text>
                      </div>
                    </div>
                  </Card>
                </Link>
              </Column>

              <Column size='6'>
                <Link href='https://github.com/innovaccer/design-system' target="_blank">
                  <Card
                    className='mr-7 p-6 h-100 overflow-visible'
                    shadow='none'
                  >
                    <div className='d-flex'>
                      <div></div>
                      <div>
                        <Heading size='m' className="mb-2 home-text-color">React components library</Heading>
                        <Text appearance='subtle' className='font-weight--normal'>
                          Use our Masala Design System  UI Kit to mock up pages and prototypes.
                        </Text>
                      </div>
                    </div>
                  </Card>
                </Link>
              </Column>
            </Row>

            <br />
            <Link href='/resources/'>
              Browse more resources
            </Link>
          </section>

          <Footer relativePagePath={'/404'} />
        </Column>
      </Row>
    </Homepage >
  );
};

export default Home;
