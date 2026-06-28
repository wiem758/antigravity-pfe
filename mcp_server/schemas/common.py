# mcp_server/schemas/common.py
from pydantic import BaseModel
from typing import Any, Optional, List

class ToolResult(BaseModel):
    success: bool
    data:    Optional[Any]  = None
    error:   Optional[str]  = None
    total:   int            = 0

class PaginatedResponse(BaseModel):
    items:     List[Any]
    total:     int
    page:      int = 1
    page_size: int = 20
    pages:     int = 1