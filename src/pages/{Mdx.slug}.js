import React from "react";
import * as styles from "../components/InfoPage.module.css";
import * as header from "../components/index.module.css"
import { graphql } from "gatsby";
import Header from "../components/Header/Header";
import { MDXRenderer } from "gatsby-plugin-mdx"
import Slider from "../components/Slider/SliderComponent/SliderComponent";

export const query = graphql`
        query ($slug: String) {
            mdx(slug:{eq:$slug}) {
                frontmatter {
                    title
                    source
                    category {
                        name
                        title
                    }
                    image {                        
                        childImageSharp {
                          gatsbyImageData 
                        }
                    }
                }
                body
            }
            allImageSharp {
                nodes {
                  gatsbyImageData                
                }
            }
        }
    `;

const InfoPage = ({ data }) => {

    const { category } = data.mdx.frontmatter;
    const images = filterImagesData(
        data.mdx.frontmatter.image.childImageSharp.gatsbyImageData.images.fallback.src,
        data.allImageSharp.nodes
    );

    return (
        <>
            <div className={header.addMargins}>
                <Header name={category.title} backPath={`/${category.name}`} />
            </div>
            <div className={styles.header}>
                <Slider images={images} />
            </div>
            <div className={styles.infoPage} >
                <h1>{data.mdx.frontmatter.title}</h1>
                <MDXRenderer>{data.mdx.body}</MDXRenderer>
                <div className={styles.links}>
                    <a target="_blank" rel="noreferrer" href={data.mdx.frontmatter.source}>Детальніше</a>
                </div>
            </div >
        </>
    );
}

function filterImagesData(previewImageSrc, allImagesData) {
    let techniqueTitle = previewImageSrc.split('/').slice(-1).toString().split('.')[0];
    allImagesData = allImagesData.filter(imageData => {
        let imageSrc = imageData.gatsbyImageData.images.fallback.src;
        let imageTitle = imageSrc.split('/').slice(-1).toString().split('.')[0];
        return imageTitle.includes(techniqueTitle);
    });
    return allImagesData;
}

export default InfoPage;
