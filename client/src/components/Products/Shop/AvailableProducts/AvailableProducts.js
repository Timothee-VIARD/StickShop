import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid, Grow, InputAdornment, Stack, TextField, Tooltip, Typography, useMediaQuery } from '@mui/material';
import Product from './Product/Product';
import { useTranslation } from 'react-i18next';
import { CurrencyContext } from '../../../../contexts/CurrencyContext';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Close, FilterAlt, FilterAltOff, FilterAltOffOutlined, FilterAltOutlined, Search } from '@mui/icons-material';

/**
 * Commponent for the AvailableProducts
 */
const AvailableProducts = () => {
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState(false);
  const { t } = useTranslation();
  const [isFilterShown, setIsFilterShown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('none');
  const [searchValue, setSearchValue] = useState('');
  const { getCurrency } = useContext(CurrencyContext);

  const categories = [
    { name: t('shop.categories.all'), value: '' },
    { name: 'Bois dur', value: 'Bois dur' },
    { name: 'Massif', value: 'Massif' },
    { name: 'Flottant', value: 'Flottant' },
    { name: 'Autre', value: 'Autre' }
  ];

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setChecked(true);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des produits:', error);
      });
  }, []);

  const handleChangePrice = (event) => {
    let { name, value } = event.target;
    if (value < 0) value = 0;
    if (value > 100) value = 100;
    if (name === 'minPrice') {
      setMinPrice(value);
    } else if (name === 'maxPrice') {
      setMaxPrice(value);
    }
  };

  const handleReset = () => {
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
  };

  const isFiltered = () => {
    return selectedCategory !== '' || minPrice !== '' || maxPrice !== '';
  };

  const handleSortClick = () => {
    if (sortOrder === 'none') {
      setSortOrder('ascending');
    } else if (sortOrder === 'ascending') {
      setSortOrder('descending');
    } else {
      setSortOrder('none');
    }
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  let sortedProducts = [...products];

  if (sortOrder === 'ascending') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'descending') {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  let filteredProducts = sortedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Stack direction="column" gap={2} className="px-8 md:px-16 py-4 md:py-8 flex-grow">
      <Stack spacing={1}>
        <Stack direction={{ xs: 'column-reverse', sm: 'row' }} rowGap={2} className="justify-between">
          <Stack direction={{ xs: 'column-reverse', sm: 'row' }} spacing={2}>
            <Stack
              direction="row"
              onClick={() => setIsFilterShown(!isFilterShown)}
              spacing={1}
              className="border border-black cursor-pointer p-1 px-2 rounded-xl hover:bg-gray-950 hover:bg-opacity-10 transition-colors duration-300 relative"
            >
              <Box className="relative">
                {isFiltered() ? (
                  <>{isFilterShown ? <FilterAltOff /> : <FilterAlt />}</>
                ) : (
                  <>{isFilterShown ? <FilterAltOffOutlined /> : <FilterAltOutlined />}</>
                )}
                {isFiltered() && <Box className="absolute top-[1px] right-0 bg-red-700 w-2 h-2 rounded-2xl"></Box>}
              </Box>
              <Typography>{isFilterShown ? t('shop.filters.titleHide') : t('shop.filters.titleDisplay')}</Typography>
            </Stack>
            <Stack
              direction="row"
              onClick={handleSortClick}
              spacing={1}
              className="border border-black cursor-pointer p-1 px-2 rounded-xl hover:bg-gray-950 hover:bg-opacity-10 transition-colors duration-300 relative"
            >
              {sortOrder === 'none' && <Typography>{t('shop.sort.empty')}</Typography>}
              {sortOrder === 'ascending' && <Typography>{t('shop.sort.asc')}</Typography>}
              {sortOrder === 'descending' && <Typography>{t('shop.sort.desc')}</Typography>}
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1} className="items-center">
            <TextField
              value={searchValue}
              onChange={handleSearchChange}
              variant="standard"
              placeholder="Recherche"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {searchValue && (
                      <IconButton onClick={() => setSearchValue('')} size="small">
                        <Close />
                      </IconButton>
                    )}
                  </InputAdornment>
                )
              }}
              className="w-full md:w-48"
            />
            <Search />
          </Stack>
        </Stack>
        {isFilterShown && (
          <Stack direction="row" spacing={2} className="w-full">
            <Stack direction="column" spacing={1} className="sm:pl-2 w-full sm:w-fit">
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <Typography className="hidden sm:block">↳</Typography>
                <Typography className="p-1 underline hidden sm:block">{t('shop.categories.title')}</Typography>
                {categories.map((category) => (
                  <Typography
                    onClick={() => setSelectedCategory(category.value)}
                    key={category.value}
                    className={`${
                      selectedCategory === category.value ? 'bg-[#80ad61]' : ''
                    } cursor-pointer p-1 px-2 rounded-xl hover:bg-gray-950 hover:bg-opacity-10 transition-colors duration-300`}
                  >
                    {category.name}
                  </Typography>
                ))}
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <Typography className="hidden sm:block">↳</Typography>
                <Typography className="p-1 underline hidden sm:block">{t('shop.price.title')}</Typography>
                <Stack direction="row" className="w-full sm:w-fit">
                  <Typography className="p-1">{t('shop.price.min')}</Typography>
                  <TextField
                    name="minPrice"
                    value={minPrice}
                    onChange={(event) => handleChangePrice(event)}
                    variant="standard"
                    type="number"
                    className="w-full sm:w-16"
                    inputProps={{ min: 0, max: 100 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">{t(`parameters.currency.${getCurrency()}`)}</InputAdornment>
                      )
                    }}
                  />
                </Stack>
                <Typography className="p-1 hidden sm:block">-</Typography>
                <Stack direction="row">
                  <Typography className="p-1">{t('shop.price.max')}</Typography>
                  <TextField
                    name="maxPrice"
                    value={maxPrice}
                    onChange={(event) => handleChangePrice(event)}
                    variant="standard"
                    type="number"
                    className="w-full sm:w-16"
                    inputProps={{ min: 0, max: 100 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">{t(`parameters.currency.${getCurrency()}`)}</InputAdornment>
                      )
                    }}
                  />
                </Stack>
              </Stack>
            </Stack>
            <Box className="items-center hidden sm:flex">
              <Tooltip title={t('shop.filters.reset')}>
                <IconButton onClick={handleReset}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        )}
      </Stack>
      {filteredProducts.length !== 0 ? (
        <Grid container spacing={3} className="pl-0 flex-grow">
          {filteredProducts
            .filter((product) => selectedCategory === '' || product.category === selectedCategory)
            .filter(
              (product) =>
                (minPrice === '' || product.price >= minPrice) && (maxPrice === '' || product.price <= maxPrice)
            )
            .map((product, index) => (
              <Grid item xs={12} sm={6} lg={3} key={product.id} className="w-full flex-grow">
                <Grow in={checked} timeout={index * 100}>
                  <Box className="h-full w-full flex-grow">
                    <Product product={product} />
                  </Box>
                </Grow>
              </Grid>
            ))}
        </Grid>
      ) : (
        <Box className="flex-grow flex justify-center items-center">{t('shop.noProducts')}</Box>
      )}
    </Stack>
  );
};

export default AvailableProducts;
