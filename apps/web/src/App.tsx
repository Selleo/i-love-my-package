import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Details from './Screens/Details'
import Home from './Screens/Home'
import PackageSearch from './Screens/PackageSearch'
import Uploaded from './Screens/Uploaded'
import '../src/assets/stylesheets/application.sass'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="uploaded" element={<Uploaded />} />
        <Route path="search" element={<PackageSearch />} />
      </Routes>
    </Layout>
  )
}

export default App
