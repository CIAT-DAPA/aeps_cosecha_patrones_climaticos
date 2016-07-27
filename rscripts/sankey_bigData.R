# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= #
# Sankey diagram
# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= #
#install.packages("jsonlite")

library(jsonlite)
dir <- 'D:/SourceCode/AEPS/cosecha_patrones_climaticos/rscripts/'

setwd(dir)

# load links data
links <- read.csv('Links_Values.csv')

# load nodes names
nodes <- read.csv('Nodes_Names.csv')

# create a list object
json <- list(nodes=data.frame(name=nodes$Name,id=nodes$id),
             links=links)

sink('test_sankey.json') # redirect console output to a file
toJSON(json, pretty=FALSE)
sink()


#library(networkD3)
#sankeyNetwork(Links=json$links, Nodes=json$nodes, Source="source",
#              Target="target", Value="value", NodeID="name",
#              units="Counts", fontSize=12, nodeWidth=30)
