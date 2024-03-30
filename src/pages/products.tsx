"use client"

import "@/app/globals.css";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import styles from "@/styles/products.module.css";
import commonStyles from "@/styles/common.module.css";
import withAuthCustom from "@/utils/withAuthCustom";
import Navbar from "@/components/molecules/Navbar";
import LayoutHome from "../components/atom/layout";
import { product } from "@/apis";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Products = () => {
    const [defaultData, setDefaultData] = useState([])

    const [productsData, setProductsData] = useState([])
    const [showData, setShowData] = useState([])
    const [page, setPage] = useState(1);
    const [countPage, setCountPage] = useState(0);
    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");

    useEffect(() => {
        setIsLoading(true)
        product.getAllProducts().then((res: any) => {
            console.log("res", res)
            let uniqueCategories: any = [...new Set(res.data.map((product: any) => product.category))];
            uniqueCategories.splice(0, 0, 'All');
            setCategoryList(uniqueCategories)

            setDefaultData(res.data)

            setProductsData(res.data)

            let tempCountPage = Math.ceil(res.data.length / 6);
            setCountPage(tempCountPage)
            let firstSixData = res.data.slice(0, 6)
            setShowData(firstSixData)

            setIsLoading(false)
        })
    }, [])

    // To get new list productdata Based on the filter
    useEffect(() => {
        if (selectedCategoryFilter !== "" && selectedCategoryFilter !== "All") {
            const filteredData = defaultData.filter((eachData: any) => eachData.category === selectedCategoryFilter)
            setProductsData(filteredData)
        } else if (selectedCategoryFilter === "All") {
            setPage(1);
            setProductsData(defaultData)
        }
    }, [defaultData, selectedCategoryFilter])

    // To process what data to show and update pagination after get new filtered ProductsData
    useEffect(() => {
        if (selectedCategoryFilter !== "") {
            let tempCountPage = Math.ceil(productsData.length / 6);
            setCountPage(tempCountPage)
            let firstSixData = productsData.slice(0, 6)
            setShowData(firstSixData)
            setIsLoading(false)
        }
    }, [productsData, selectedCategoryFilter])

    const getItemsForPage = (event: React.ChangeEvent<unknown>, pageNumber: number) => {
        setPage(pageNumber);
        const startIndex = (pageNumber - 1) * 6;
        const endIndex = startIndex + 6;
        let newData = productsData.slice(startIndex, endIndex);
        setShowData(newData)
    };

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedCategoryFilter(event.target.value as string);
    };

    return (
        <LayoutHome>
            <main
                className={styles.homeContainer}
            >
                <Suspense fallback={<div>Loading...</div>}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl className={`${commonStyles.marginTop16}`} style={{ width: 200 }}>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedCategoryFilter}
                                label="Category"
                                onChange={handleChange}
                            >
                                {categoryList.map((eachCategory) => (
                                    <MenuItem key={eachCategory} value={eachCategory}>{eachCategory}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <div >
                        <Box sx={{ flexGrow: 1 }}>
                            {isLoading ? (
                                <div className={`${commonStyles.flexContentCenter} ${commonStyles.fullWidth}`} style={{ height: 300 }}>
                                    Loading
                                </div>
                            ) : (
                                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                    {showData.map((eachData: any, index) => (
                                        <Grid item xs={2} sm={4} md={4} mt={4} key={index}>
                                            <Card sx={{ maxWidth: 345 }}>
                                                <CardMedia
                                                    sx={{ height: 140 }}
                                                    image={eachData.image}
                                                    title={eachData.title}
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {eachData.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {eachData.description}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small">Add to cart</Button>
                                                    <Button size="small">Delete</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </Box>
                    </div>
                    <div className={`${commonStyles.flexContentCenter} ${commonStyles.marginTop16}`}>
                        <Pagination count={countPage} page={page} onChange={getItemsForPage} />
                    </div>
                </Suspense>
            </main>
        </LayoutHome>
    )
}

const ProductsWithAuth = withAuthCustom(Products);
export default ProductsWithAuth; 
